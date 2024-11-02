from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Data models
class Order(BaseModel):
    id: int
    customer_name: str
    address: str
    item: str
    status: str = "Pending"  # Default status is Pending

# In-memory data storage (for simplicity)
orders = []  # Stores all orders
order_counter = 1  # Simple counter to increment order IDs


# Endpoints
@app.post("/customer/order", response_model=Order)
def create_order(customer_name: str, address: str, item: str):
    global order_counter
    new_order = Order(id=order_counter, customer_name=customer_name, address=address, item=item)
    orders.append(new_order)
    order_counter += 1
    return new_order


@app.get("/driver/orders", response_model=List[Order])
def get_available_orders():
    # Filter orders with 'Pending' status
    available_orders = [order for order in orders if order.status == "Pending"]
    return available_orders


@app.put("/driver/order/{order_id}/accept", response_model=Order)
def accept_order(order_id: int):
    # Find order by ID
    for order in orders:
        if order.id == order_id:
            if order.status == "Pending":
                order.status = "Accepted"
                return order
            else:
                raise HTTPException(status_code=400, detail="Order has already been accepted or completed.")
    raise HTTPException(status_code=404, detail="Order not found.")




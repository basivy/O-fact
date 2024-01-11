from fastapi import FastAPI, BackgroundTasks
import csv

app = FastAPI()
latest_data = []

def read_csv():
    global latest_data
    data = []
    with open('random_output.csv', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            data.append(row[0])
    latest_data = data

@app.get("/read_csv")
async def get_csv_data():
    return {"random_numbers": latest_data}

@app.get("/update_data")
async def update_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(read_csv)  # แก้ไขตรงนี้
    return {"message": "Updating data..."}

import csv
import requests
import time

with open('random_output.csv', newline='') as file:
    reader = csv.reader(file)
    for row in reader:

        data1 = ','.join(row) 
        data = f"[{data1}]"
        
        r = requests.post("http://127.0.0.1:8000/generate", data={'data sensor': data })
        
        # ตรวจสอบการตอบกลับ
        if r.status_code == 200:
            print(f"Sending data: {data}")
        else:
            print("Failed to send data.")
        
        time.sleep(2)  # หน่วงเวลา 1 วินาที

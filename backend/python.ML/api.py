import csv
import requests
import time

with open('random_output.csv', newline='') as file:
    reader = csv.reader(file)
    for row in reader:

        data1 = ','.join(row)  # แปลงแต่ละแถวใน CSV เป็นข้อความที่คั่นด้วยเครื่องหมาย ,
        data = f"[{data1}]"
        print(f"Sending data: {data}")
        
        # ส่งข้อมูลไปยัง URL โดยใช้ POST request
        r = requests.post("http://127.0.0.1:8000/generate", data={'data sensor': data })
        
        # ตรวจสอบการตอบกลับ
        if r.status_code == 200:
            print("Data sent successfully.")
        else:
            print("Failed to send data.")
        
        time.sleep(2)  # หน่วงเวลา 1 วินาที

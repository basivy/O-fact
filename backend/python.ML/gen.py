import csv
import random
import time

label = ['sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6', 'sensor7', 'sensor8']
datas = [[random.randint(0, 99) for _ in range(8)] for _ in range(99999)]

with open('random_output.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(label)  # Write the labels to the CSV file
    for row in datas:
        writer.writerow(row)
        print(row)
        file.flush()
        time.sleep(2)

import csv
import random
import time

data = [[random.randint(0, 99) for _ in range(12)] for _ in range(999)]

with open('random_output.csv', 'w', newline='') as file:
    for row in data:
        writer = csv.writer(file)
        writer.writerow(row)
        print(row)
        file.flush()
        time.sleep(2)  



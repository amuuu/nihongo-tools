import csv
import json

with open('data_raw.csv', encoding="UTF-8") as f:
    csv_reader = csv.reader(f, delimiter=',')
    todump = [] 
    for row in csv_reader:
        #Number, Meaning, PRON, Vる, Vます, Vない, ｖて, Vた
        item = {
            "dictionaryForm": row[3],
            "pronunciation": row[2],
            "masuForm": row[4],
            "teForm": row[6],
            "taForm": row[7],
            "naiForm": row[5],
            "meaning": row[1]
        }
        todump.append(item)

    with open("data_converted.js", "w", encoding="UTF-8") as new_file:
        new_file.write("const verbsDataJSON = `" + json.dumps(todump, ensure_ascii=False) + "`;")
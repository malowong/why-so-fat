import cv2
import pytesseract
from PIL import Image
import numpy as np
import re

result = {}

def ocr(img):

    jpg_as_np = np.frombuffer(img, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=1)
    
    image_removed_lines = remove_lines(img)

    print(image_removed_lines)

    text = pytesseract.image_to_string(image_removed_lines, lang='eng+chi_tra')

    lines = text.split('\n')

    print(lines)

    for line in lines:

        try:

            if "per" in line.lower() and "100" in line.lower():
                result['per'] = 'per_100'
            elif "per" in line.lower() and "ser" in line.lower():
                result['per'] = 'per_serving'
            elif "per" in line.lower() and "pac" in line.lower():
                result['per'] = 'per_package'

            if "ser" in line.lower() and "size" in line.lower():
                insert_data(line, 'serving_size', 1)

            if "ener" in line.lower() or "ergy" in line.lower():
                insert_data(line, 'energy', 4)
            
            if "pro" in line.lower() or "ein" in line.lower():
                insert_data(line, 'protein', 1)
            
            if "tot" in line.lower() and "fat" in line.lower():
                insert_data(line, 'total_fat', 1)
            
            if "urated" in line.lower() and "fat" in line.lower():
                print("yes")
                insert_data(line, 'saturated_fat', 1)

            if "tran" in line.lower() and "fat" in line.lower():
                print("yes")
                insert_data(line, 'trans_fat', 1)

            if "carbo" in line.lower() or "hydra" in line.lower():
                insert_data(line, 'carbohydrates', 1)

            if "sug" in line.lower():
                insert_data(line, 'sugar', 1)
            
            if "sod" in line.lower():
                insert_data(line, 'sodium', 2)


        except Exception as e: 

            print(e)

            continue

    return result
        

def insert_data(line, nutrition, unit_letter):
    num = spell_checker(re.search("\d+(.*)", line).group())

    if "/" in num:
        result[nutrition] = re.search(f"\d*\.?\d*(?=.{{{unit_letter}}}[\/])", num).group() if re.search(f"\d*\.?\d*(?=.{{{unit_letter}}}[\/])", num).group() != '' else re.search(f"(\d*\.?\d*)(?!.*\d)", num).group()
    else:
        result[nutrition] = re.search(f"\d*\.?\d*(?=.{{{unit_letter}}})", num).group()

def spell_checker(text):
    if "i" in text:
        text = text.replace('i', '1')
    if "O" in text:
        text = text.replace("O", "0")
    if ";" in text:
        text = text.replace(";", ".")
    if "," in text:
        text = text.replace(",", ".")
    if "G" in text:
        text = text.replace("G", "6")
    if "T" in text:
        text = text.replace("T", "7")
    if "﹒" in text:
        text = text.replace("﹒", ".")

    return text

def remove_lines(img):

    # image = cv2.imread(img)
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Remove horizontal
    horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (250,1))
    detected_lines = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, horizontal_kernel, iterations=2)
    vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1,250))
    detected_lines_2 = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, vertical_kernel, iterations=2)

    cnts = cv2.findContours(detected_lines, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    for c in cnts:
        cv2.drawContours(img, [c], -1, (255,255,255), 10)

    cnts = cv2.findContours(detected_lines_2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    for c in cnts:
        cv2.drawContours(img, [c], -1, (255,255,255), 10)

    return Image.fromarray(img)

if __name__ == '__main__':
    image_path = '/Users/malowong/tecky-project/c17-bad-project-10-tw/python_test/image/IMG_2545 copy.jpg'
    result = ocr(image_path)
    print(result)
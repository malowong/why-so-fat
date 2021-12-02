import easyocr
import re

data = {}


def ocr(image):

  reader = easyocr.Reader(['ch_tra', 'en'], gpu=True)
  result = reader.readtext(image)

  result.append(([[189, 75], [469, 75], [469, 165], [
                189, 165]], 'testing1', 0.3754989504814148))
  result.append(([[189, 75], [469, 75], [469, 165], [
                189, 165]], 'testing2', 0.3754989504814148))

  for i in range(len(result) - 2):
    coordinate = result[i][0]
    text = result[i][1]

    print(text)

    serving_size_1 = re.search("ser", text, re.IGNORECASE)
    serving_size_2 = re.search("size", text, re.IGNORECASE)
    energy = re.search("ener", text, re.IGNORECASE)
    protein_1 = re.search("pro", text, re.IGNORECASE)
    protein_2 = re.search("ein", text, re.IGNORECASE)
    fat = re.search("fat", text, re.IGNORECASE)
    total_fat = re.search("tot", text, re.IGNORECASE)
    saturated_fat = re.search("urated", text, re.IGNORECASE)
    trans_fat = re.search("tran", text, re.IGNORECASE)
    carbohydrates = re.search("carbo", text, re.IGNORECASE)
    sodium = re.search("sod", text, re.IGNORECASE)
    sugar = re.search("sug", text, re.IGNORECASE)

    if serving_size_1 and serving_size_2:
      if re.search("\d*\.?\d*(?=g[\/])", text) is None:
        new_text = spell_checker(result[i+1][1])
        data['serving_size'] = re.search("\d*\.?\d*", new_text).group()
      else:
        new_text = spell_checker(result[i][1])
        data['serving_size'] = re.search("\d*\.?\d*", new_text).group()

    if energy:
      find_number(result, 'energy', i)

    if protein_1 or protein_2:
      find_number(result, 'protein', i)

    if total_fat and fat:
      find_number(result, 'total_fat', i)

    if saturated_fat and fat:
      find_number(result, 'saturated_fat', i)

    if trans_fat and fat:
      find_number(result, 'trans_fat', i)

    if carbohydrates:
      find_number(result, 'carbohydrates', i)

    if sodium:
      find_number(result, 'sodium', i)

    if sugar:
      find_number(result, 'sugar', i)

  return data


def find_number(result, nutrition: str, i):
  next_text = spell_checker(result[i+1][1])
  if re.search("\d*\.?\d*", next_text).group() == "":
    second_next_text = spell_checker(result[i+2][1])
    data[nutrition] = re.search("\d*\.?\d*", second_next_text).group()
  else:
    data[nutrition] = re.search("\d*\.?\d*", next_text).group()


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
  return text


if __name__ == '__main__':
  image_path = '/Users/malowong/tecky-project/c17-bad-project-10-tw/pytesseract/test_1_success.jpg'
  result = ocr(image_path)
  for item in result.items():
    print(item)

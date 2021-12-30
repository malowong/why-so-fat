from sanic import Sanic
from sanic.response import json
from ocr import ocr
import base64

app = Sanic("My Hello, world app")


@app.post("/")
def get_nutrition_info(request):

    req = request.json["data"]

    img = base64.decodebytes(req.encode())

    result = ocr(img)
    print(result)

    return json({"data": result})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)

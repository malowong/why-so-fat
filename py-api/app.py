from sanic import Sanic
from sanic.response import json
from ocr import ocr
import aiofiles

app = Sanic("My Hello, world app")

@app.post("/")
def get_nutrition_info(request):
    print(request.files["image"][0].body)

    result = ocr("/Users/malowong/tecky-project/c17-bad-project-10-tw/c17-bad-project-10-tw/py-api/tests/uploads/crop_test_3.jpg")

    return json({"message": "success"})

    # rf = request.files['files[]']
    # ext = rf.mimetype.split('/')[1]
    # dst = session['image'] = 'tmp/{}.{}'.format(session['key'], ext)

    # try:
    #     # extract starting byte from Content-Range header string
    #     range_str = request.headers['Content-Range']
    #     start_bytes = int(range_str.split(' ')[1].split('-')[0])
    #     with open(dst, 'ab') as f:
    #         f.seek(start_bytes)
    #         f.write(rf.stream.read())
    #     return jsonify({})
    # except KeyError:
    #     with open(dst, 'wb') as f:
    #         f.write(rf.stream.read())
    #     return jsonify({})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)

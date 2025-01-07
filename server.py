#レスポンシブ対応確認用
from flask import Flask, send_from_directory

app = Flask(__name__)

# 静的ファイル（HTML、CSS、JavaScript）の配信
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

from config import *
from classe import Serie

@app.route("/")
def inicio():
    return 'Sistema para cadastrar séries. '+\
        '<a href="/listar_series">Listar Séries</a>'

@app.route("/listar_series")
def listar_series():
    series = db.session.query(Serie).all()
    serie_em_json = [ x.json() for x in series ]
    resposta = jsonify(serie_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_serie", methods=['post'])
def incluir_serie():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        nova = Serie(**dados)
        db.session.add(nova)
        db.session.commit()
    except Exception as e: 
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/excluir_serie/<int:serie_id>", methods=["delete"])
def excluir_serie(serie_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Serie.query.filter(Serie.id == serie_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)
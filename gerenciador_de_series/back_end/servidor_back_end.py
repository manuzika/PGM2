from config import *
from classe import Emissora, Serie, Elenco

@app.route("/")
def inicio():
    return 'Sistema para cadastrar séries. '+\
        '<a href="/listar_serie">Listar Séries</a>'

@app.route("/listar/<string:classe>")
def listar(classe):
    dados = None
    if classe == "Emissora":
      dados = db.session.query(Emissora).all()
    elif classe == "Serie":
      dados = db.session.query(Serie).all()
    elif classe == "Elenco":
      dados = db.session.query(Elenco).all()
    lista_jsons = [ x.json() for x in dados ]
    resposta = jsonify(lista_jsons)
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
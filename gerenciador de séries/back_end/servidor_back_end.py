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
    # fornecer a lista de pessoas em formato json
    return jsonify(serie_em_json)

app.run(debug=True)
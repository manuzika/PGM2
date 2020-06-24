from config import *

class Serie(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    temporada = db.Column(db.Integer)
    genero = db.Column(db.String(254))
    status = db.Column(db.String(254))
    classificacao_indicativa = db.Column(db.Integer)

    def __str__(self):
        return str(self.id)+") " + self.nome + ", " +\
            str(self.temporada) + ", " + self.genero + ", " +\
            self.status + ", " + str(self.classificacao_indicativa)

    def json(self):
        return json.dumps({
            "id": self.id,
            "nome": self.nome,
            "número de temporadas": self.temporada,
            "gênero": self.genero,
            "status": self.status,
            "classificação indicativa": self.classificacao_indicativa
        })
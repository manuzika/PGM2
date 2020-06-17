from config import *

class Serie(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    temporada = db.Column(db.Integer)
    genero = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            str(self.temporada) + ", " + self.genero

    def json(self):
        return json.dumps({
            "id": self.id,
            "nome": self.nome,
            "número de temporadas": self.temporada,
            "gênero": self.genero
        })
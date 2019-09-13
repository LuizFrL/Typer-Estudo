from firebase import firebase
from bs4 import BeautifulSoup as bs
import requests
from time import sleep


class frasesO_Pensador(object):

    def __init__(self, firebase_link):
        self.firebaseLink = firebase_link
        self.banco = firebase.FirebaseApplication(self.firebaseLink)

    def _montaDicionario(self, div):
        return {
            'texto': div.find('p', {'class': 'frase fr'}).text,
            'tempo': len(str(div.find('p', {'class': 'frase fr'}).text).split(' ')),
            'pensador': div.find('span', {'class': 'autor'}).text.strip()
        }

    def gerar_frases(self, pensador_frase, **kwargs):
        site = f'https://www.pensador.com/{pensador_frase}/'

        pensador = requests.get(site).content.decode('utf-8').replace('\n', '')
        resultado = bs(pensador, 'html.parser')

        frases = resultado.find_all('div', {'class': "thought-card"})

        frases_only = []

        for item in frases:
            try:
                frases_only.append(self._montaDicionario(item))
            except AttributeError:
                print('Não possível coletar informações com', item)
                continue

        return frases_only

    def adicionar_firebase(self, data):
        data = self._frases_repetidas(data)

        if not data:
            print('Nenhum novo valor cadastrado...')
        else:
            for item in data:
                print('Adicionando:', item)
                self.banco.post('/frases', item)

    def _frases_repetidas(self, data):
        frases_site = [frase['texto'] for frase in data]

        itensBanco = self.banco.get('/frases', None)

        if not itensBanco:
            return data

        frases_banco = [item['texto'] for item in itensBanco.values()]

        frases_fora = []

        for item in frases_site:
            if item not in frases_banco:
                for frase in data:
                    if str(frase['texto']) == item:
                        frases_fora.append(frase)

        return frases_fora


if __name__ == '__main__':
    while True:

        firebase_link = 'LINK_SERVER'
        dados_adc = frasesO_Pensador(firebase_link)

        frases = dados_adc.gerar_frases('PENSADOR_ESCOLHA')

        dados_adc.adicionar_firebase(frases)

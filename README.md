# Mocking and testing

Este repositorio sirve como complmento a la charla sobre [Mocking & testing](https://mocking-and-testing.vercel.app/)

# Entornos

## jss

Es el entorno para ver el funcionamiento de Json server, hay que ejecutarlo junto con:

`npm run mocks`

## MSW

Este entorno nos utiliza la implentación de Mock Server Worker

# Entorno de testing

Para lanzar las suites de test en debemos especificar que entorno queremos usar

`npm run test:jss` debemos lanzarlo junto con `npm run mocks` si no recuperará datos.

`npm run test:msw` ejecutará todo con éxito.

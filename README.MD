# 1. Integrantes

Andre Neves RM - 553515  
Caio Tominaga RM - 553633  
Eduardo Brites RM - 552943  
Isabela Barcellos RM - 553746  
Thais Gonçalves RM - 553892

---

# 2. Primeiros passos [GitHub]

Primeiramente, no terminal, clone o repositório com:
```bash
  git clone https://github.com/GS-Espaco/GlobalSolution_Mobile.git
```
Abra o projeto `../GLOBALSOLUTION_MOBILE`
```bash
  cd GLOBALSOLUTION_MOBILE
```
Logo depois:
```bash
  cd backend
  npm install

  cd ..

  cd frontend
  npm install
```

---

# 2.1. Primeiros passos [.zip]
Extraia o arquivo .zip e no terminal, abra o projeto na pasta raiz `../GLOBALSOLUTION_MOBILE`
```bash
  cd [seu_diretorio]/GLOBALSOLUTION_MOBILE
```
Logo depois:
```bash
  cd backend
  npm install

  cd ..

  cd frontend
  npm install
```

---

# 3. Como rodar o projeto

Para rodar o projeto basta abrir um terminal na pasta raiz `GLOBALSOLUTION_MOBILE` e executar a seguinte sequência de comandos:
```bash
  cd backend
  npm run dev
```
E em outro terminal também na pasta raiz:
```bash
  cd frontend
  npm expo start
```
Depois, dentro do terminal com o frontend rodando escaneie o QR Code com o seu aplicativo ExpoGo ou então aperte a tecla `w` para abri-lo no navegador.  

 ⚠️Obs: Leia a próxima seção para evitar problemas de conexão com a API.

---

# 4. Importante saber

Dentro do arquivo `frontend/services/api.ts` existe uma variável chamada `API_URL` contendo a rota para a API rodando localmente, se o aplicativo rodar na web (apertando a tecla `w` dentro do terminal do frontend) ele pode permanecer com `http://localhost:3000` ou a porta que o seu backend der, porém, se o aplicativo for executado em outro dispositivo na mesma rede a rota **DEVE** ser composta por `http://[ip]:3000`. Para descobrir o ip basta abrir um terminal e rodar o comando `ipconfig` ele gerará uma lista de ips, pegue o valor do primeiro `IPv4` que aparecer, ele deverá ter o formato `000.000.0.0`

---

# 5. Credenciais para login

Para logar dentro do aplicativo utilize as seguintes credenciais:

email: admin@email.com
senha: 123456
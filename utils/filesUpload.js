/**
 * Função para fazer upload de arquivos.
 *
 * events:
 *  uploadstart: evento será emitido no `document` quando iniciar o upload.
 *  uploadprogress: evento será emitido no `document` quando mudar o progresso do upload.
 *  uploadend: evento será emitido no `document` quando completar o upload.
 *
 * @author Everton de Souza Andrade.
 * @param {URL} url url Caminho da requisição.
 * @param {FileList} files filelist Objeto FileList dos arquivos que serão enviados.
 * @param {object} data {auth, data, accept}
 * @return {object} { progress, reponse }
 *                    progress: que contém o número que representa o progresso percentual do upload,
 *                    response: promessa que resolverá quando completar o upload.
 */
const filesUpload = (url, files, { auth, data, accept }) => {
  document.dispatchEvent(
    new CustomEvent("uploadstart", {
      progress: 0,
      target: url
    })
  );

  let req = new XMLHttpRequest();

  let res = {
    progress: 0,
    response: new Promise(
      (resolve, reject) =>
        (req.onreadystatechange = () => {
          if (req.readyState == 4) {
            if (req.status == 202) resolve(req.response);
            if (req.status >= 400) reject(req.response);
          }
        })
    )
  };

  req.upload.addEventListener("progress", e => {
    res.progress = (e.loaded / e.total) * 100;
    document.dispatchEvent(
      new CustomEvent("uploadprogress", {
        detail: {
          progress: res.progress,
          target: url
        }
      })
    );
  });

  let formData = new FormData();

  let i = 0;
  for (let file of files) formData.append("file" + i++, file, file.name);

  for (let key in data) formData.append(key, data[key]);

  req.open("POST", url);
  req.withCredentials = true;
  req.setRequestHeader("Authorization", auth);
  req.responseType = accept || "json";
  req.send(formData);

  document.dispatchEvent(
    new CustomEvent("uploadend", {
      detail: {
        progress: 100,
        target: url
      }
    })
  );

  return res;
};

export default filesUpload;

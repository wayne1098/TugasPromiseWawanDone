document.getElementById("input").addEventListener("keyup", livesearch)
function livesearch(){
    let key = document.getElementById("input").value.toUpperCase();
    if (key.length == 0){
      fetch('https://newsapi.org/v2/top-headlines?'+'country=id&' + 'apiKey=10b07017fe314da1ba834e02b205b90c')
          .then(Response => Response.json())
          .then(Response => {
                document.getElementById('card').innerHTML = render(Response) 
        }).catch(err => {
          document.getElementById('card').innerHTML = `<p style="backdrop-filter: blur(8px); color:white; text-align: center;">Request Data Sudah Terlalu Banyak</p>`;
        });
    }else{
      fetch('https://newsapi.org/v2/top-headlines?'+'q='+key+'&'+'country=id&' + 'apiKey=10b07017fe314da1ba834e02b205b90c')
          .then(Response => Response.json())
          .then(Response => {
                  if(Response.articles.length == 0){
                    document.getElementById('card').innerHTML = `<p style="backdrop-filter: blur(8px);  text-align: center;">Pencarian Tidak Ditemukan</p>`;
                }else{
                    document.getElementById('card').innerHTML = render(Response) 
                }
        }).catch(err => {
          document.getElementById('card').innerHTML = `<p style="backdrop-filter: blur(8px);  color:white; text-align: center;">Request Data Sudah Terlalu Banyak</p>`;
        });
    }
  }

function render(result) {
  let card = '';
  result.articles.map(s => {
    card += `
    <div class="col-md-4 ">
              <div class="card-fluid mt-4 px-2 pb-2 " style="width: 20rem;">
              <img src="${s.urlToImage}" class="card-img-top" alt="">
              <div class="card-body">
              <h5 class="card-title">${s.title}</h5>   
              <h6 class="card-subtitle mb-2 text-muted mt-2">${s.author} - ${s.publishedAt}</h6>
              <p class="card-text mt-3">${s.description}</p>
              <a href="${s.url}" target="blank" class="btn btn-success">Lihat detail</a>
              </div>
          </div>
      </div>`;
  })
  return card;
}

livesearch()

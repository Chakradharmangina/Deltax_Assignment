import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import Modal from "react-bootstrap/Modal";

function HomePage() {
  const [songlist, setsongs] = useState([]);
  const [artistlist, setartist] = useState([]);
  const [filter, setfilter] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3003/getdata`)
      .then((res) => {
        setsongs(res.data.items);
        setfilter(res.data.items);
        let artistlist1 = res.data.items.sort((a, b) =>
          a["artistavgrating"] > b["artistavgrating"] ? -1 : 1
        );
        const uniqueIds = [];
        const unique = artistlist1.filter((element) => {
          const isDuplicate = uniqueIds.includes(element.artistname);
          if (!isDuplicate) {
            uniqueIds.push(element.artistname);
            return true;
          }
          return false;
        });
        setartist(unique);
      })
      .catch((err) => console.log(err));
  }, []);

  function handlerating(e, i, sn) {
    let confirm = window.confirm(`your are giving ${e / 10} rating to ${i} `);
    console.log(e, i, sn);
    if (confirm) {
      axios
        .post(`http://localhost:3003/addavg`, {
          newrating: e / 100,
          artistname: i,
          songname: sn,
        })
        .then((res) => {
          let data1 = res.data.newitems;
          setsongs(data1);
          let artistlist2 = data1.sort((a, b) =>
            a["artistavgrating"] > b["artistavgrating"] ? -1 : 1
          );
          const uniqueIds = [];
          const unique = artistlist2.filter((element) => {
            const isDuplicate = uniqueIds.includes(element.artistname);
            if (!isDuplicate) {
              uniqueIds.push(element.artistname);
              return true;
            }
            return false;
          });
          setartist(unique);
          setTimeout(window.location.reload(), 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location.reload();
    }
  }
  function handlechange(e) {
    e.preventDefault();
    let searchdata = e.target.value;
    if (searchdata.trim() !== "") {
      let result = filter.filter(
        (x) =>
          x.songname.includes(searchdata) || x.artistname.includes(searchdata)
      );
      setsongs(result);
    }
    if (searchdata.trim() === "") {
      console.log(songlist);
      setsongs(songlist);
    }
  }

  function handledone(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3003/addsong`, {
        songname: document.getElementById("songname").value,
        dateofrelease: document.getElementById("dateofrelease").value,
        artistname: document.getElementById("ArtistnName").value,
        dateofbirth: document.getElementById("DOB").value,
        Bio: document.getElementById("BIO").value,
      })
      .then((res) => {
        console.log(res);
        window.alert(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            Haii ,{localStorage.getItem("username")} !
          </a>
          <form className="d-flex col-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search By Songname 'or' artistname"
              aria-label="Search"
              onChange={(e) => handlechange(e)}
            />
          </form>
        </div>
      </nav>
      <br></br>
      <h4 style={{ float: "left", fontStyle: "italic" }}>TOP 10 Songs</h4>
      <div style={{ float: "right" }} className="col-2 mx-auto">
        <button variant="primary" onClick={handleShow}>
          + Add_Song
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title closeButton> &nbsp; Add a New Song</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-row">
                <div class="form-group col-md-8 mb-2">
                  <label class="mb-1" for="songname">
                    Song_Name
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="songname"
                    placeholder="songname"
                    required
                  />
                </div>
                <div class="form-group col-md-8">
                  <label class="mb-1" for="dateofrelease">
                    Date_Of_Release
                  </label>
                  <input
                    type="text"
                    class="form-control mb-1"
                    id="dateofrelease"
                    placeholder="DD-MM-YYYY"
                    required
                  />
                </div>
              </div>
              <div class="form-group  col-md-8 mb-2">
                <label class="mb-1" for="ArtistName">
                  ArtistName
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="ArtistnName"
                  placeholder="enter Artist name"
                  required
                />
              </div>
              <div class="form-group  col-md-8 mb-2">
                <label class="mb-1" for="DOB">
                  Date_Of_Birth
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="DOB"
                  placeholder="Artist DOB(DD-MM-YYYY)"
                  required
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-8">
                  <label class="mb-1" for="BIO">
                    Bio
                  </label>
                  <textarea
                    type="text"
                    class="form-control mb-2"
                    id="BIO"
                    required
                  />
                </div>
              </div>

              <button variant="secondary" onClick={(e) => handledone(e)}>
                Done
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <br></br>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Art Work</th>
            <th scope="col">Song</th>
            <th scope="col">Date_Of_Release</th>
            <th scope="col">Artists</th>
            <th scope="col">Song_Rating</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
        <tbody>
          {songlist &&
            songlist.slice(0, 10).map((i) => (
              <tr key={i._id}>
                <th scope="row">
                  {
                    <img
                      src="https://e7.pngegg.com/pngimages/1005/848/png-clipart-sing-karaoke-singing-song-music-singing-microphone-musician-thumbnail.png"
                      width="40px"
                      height="35px"
                      alt="arist img"
                    ></img>
                  }
                </th>
                <td>{i.songname}</td>
                <td>{i.dateofrelease}</td>
                <td>{i.artistname}</td>
                <td>{(i.songavgrating * 5).toFixed(2)}</td>
                <td>
                  <Rating
                    onClick={(e) => handlerating(e, i.artistname, i.songname)}
                    size={20}
                    label
                    transition
                    fillColor="orange"
                    emptyColor="gray"
                    className="foo"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>
      <h4 style={{ float: "left", fontStyle: "italic" }}>TOP 10 Artists</h4>
      <br></br>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Artist</th>
            <th scope="col">Date_Of_Birth</th>
            <th scope="col">SongName</th>
          </tr>
        </thead>
        <tbody>
          {artistlist &&
            artistlist.slice(0, 10).map((i) => (
              <tr key={i._id}>
                <th scope="row">{artistlist.indexOf(i) + 1}</th>
                <td>{i.artistname}</td>
                <td>{i.Bio}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;

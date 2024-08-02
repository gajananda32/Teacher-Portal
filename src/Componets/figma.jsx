import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainImage from '../assests/A50E9.png';

 
const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    ProductData();
  }, []);

  const ProductData = async () => {
    try {
      const productsData = await axios.get('https://dummyjson.com/products');
      console.log("🚀 ~ Products ~ productsData:", productsData);
      setCardsData(productsData.data.products);
    } catch (error) {
      console.log("🚀 ~ Products ~ error:", error);
    }
  };

  console.log("🚀 ~ Products ~ productsData:", cardsData);

  const openModal = (card) => {
    setSelectedCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <div>
      <div className="main-image-container">
        <img
          src={mainImage}
          alt="Main"
          className="main-image"
        />
        <div className="quote-overlay">
          <p>"The Best Investment on Earth is Earth" - Louis Glickman</p>
        </div>
      </div>

      <div className="text-content container mt-4">
        <h2>Gated Community Plots in Bangalore</h2>
        <h2>Find Your Dream Plot Today</h2>
        <p>
          Come to Bangalore, the “Silicon Valley of India,” and live in complete luxury amidst nature. In this lively city of hustle and bustle, gated community plots offer serene green spaces and exquisite living like no other. These plots provide residents and investors with unparalleled tranquillity and a touch of adventure amid nature. Discover a way of life in Bangalore where nature and luxury blend perfectly.
        </p>
        <p>
          The buzz around Bangalore's real estate market is all about secure, upscale living, with gated communities stealing the spotlight. Anticipate a surge of advancements in 2024 that combine opulence and ease with a focus on maintaining safety at the forefront. Picture this: guards at every gate, round-the-clock CCTV surveillance, and a secure environment where only the invited can enter. It's the epitome of safe living!
        </p>
        <p>
          However, it doesn't end there. In these secluded neighbourhoods, abundant green spaces and top-notch amenities combine urban living with peaceful refuge. These residential havens capture the true essence of urban living, offering tranquillity and unmatched protection. Imagine a Bangalore home that elevates your lifestyle, where sophistication and safety converge, making every moment extraordinary!
        </p>
      </div>

      <div className="container mt-4">
        <div className="row">
          {cardsData.length > 0 ? (
            cardsData.map((card) => (
              <div key={card.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={card.thumbnail} className="card-img-top" alt={card.title} />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text text-truncate" style={{ maxHeight: "3rem" }}>{card.description}</p>
                    <p className="card-text"><strong>Price:</strong> ${card.price}</p>
                    <p className="card-text"><strong>Rating:</strong> {card.rating}⭐</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-primary" onClick={() => openModal(card)}>View More</button>
                      <button className="btn btn-secondary" onClick={() => window.open(card.url, "_blank")}>Site Visit</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          content: {
            maxWidth: '90vw',
            maxHeight: '60vh',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <button onClick={closeModal} className="close" style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.5rem', background: 'transparent', border: 'none' }}>
          &times;
        </button>
        {selectedCard && (
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <img src={selectedCard.thumbnail} alt={selectedCard.title} className="img-fluid" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }} />
              </div>
              <div className="col-md-7">
                <h2>{selectedCard.title}</h2>
                <p>{selectedCard.description}</p>
                <p><strong>Price:</strong> ${selectedCard.price}</p>
                <p><strong>Rating:</strong> {selectedCard.rating}⭐</p>
                <p><strong>Stock:</strong> {selectedCard.stock}</p>
                <p><strong>Category:</strong> {selectedCard.category}</p>
              </div>
            </div>
          </div>
        )}
      </ReactModal>

      <style jsx>{`
        .main-image-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .quote-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          text-align: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.5); /* Semi-transparent background for better readability */
          border-radius: 10px;
        }
        .text-content {
          text-align: center;
        }
        .text-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .text-content p {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .card-body .btn-secondary {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default Home;

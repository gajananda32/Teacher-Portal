import React, { useState } from 'react';
import ReactModal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainImage from '../assests/2259E.png';
import cardImage1 from '../assests/A50E9.png';
import cardImage2 from '../assests/Mask group (1).png';
import cardImage3 from '../assests/Mask group (2).png';
import cardImage4 from '../assests/Mask group (3).png';
import cardImage5 from '../assests/Mask group (4).png';
import cardImage6 from '../assests/Mask group.png';


const cardsData = [
    {
      id: 1,
      title: "The Maple House",
      description: "A beautiful bungalow with a spacious garden and modern amenities, perfect for families seeking tranquility in the heart of the city.",
      image: cardImage1,
      price: "$450,000",
      rating: "4.5",
      category: "Residential"
    },
    {
      id: 2,
      title: "The Oak Villa",
      description: "This luxurious villa features elegant interiors, a private swimming pool, and lush landscaping, providing a perfect retreat from city life.",
      image: cardImage2,
      price: "$750,000",
      rating: "4.7",
      category: "Luxury"
    },
    {
      id: 3,
      title: "The Pine Retreat",
      description: "Experience serene living in this charming bungalow surrounded by pine trees. Ideal for those looking for a cozy and peaceful home.",
      image: cardImage3,
      price: "$320,000",
      rating: "4.2",
      category: "Countryside"
    },
    {
      id: 4,
      title: "The Cedar Estate",
      description: "A grand estate offering spacious living areas, state-of-the-art facilities, and breathtaking views of the surrounding landscape.",
      image: cardImage4,
      price: "$1,200,000",
      rating: "4.9",
      category: "Estate"
    },
    {
      id: 5,
      title: "The Willow Cottage",
      description: "A quaint cottage with a warm and inviting atmosphere, featuring a beautiful garden and a quaint charm perfect for small families or couples.",
      image: cardImage5,
      price: "$275,000",
      rating: "4.4",
      category: "Cozy"
    },
    {
      id: 6,
      title: "The Birch Mansion",
      description: "An opulent mansion with luxurious finishes, expansive rooms, and a large backyard. Ideal for those who enjoy a lavish lifestyle.",
      image: cardImage6,
      price: "$2,000,000",
      rating: "5.0",
      category: "Mansion"
    }
  ];
  
  const Home = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
  
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
  
        <div className="text-content container mt-5">
          <h2 className="text-center mb-4">Gated Community Plots in Bangalore</h2>
          <p className="lead text-center mb-4">
            Find Your Dream Plot Today
          </p>
          <p className="text-center mb-4">
            Come to Bangalore, the “Silicon Valley of India,” and live in complete luxury amidst nature. In this lively city of hustle and bustle, gated community plots offer serene green spaces and exquisite living like no other. These plots provide residents and investors with unparalleled tranquillity and a touch of adventure amid nature. Discover a way of life in Bangalore where nature and luxury blend perfectly.
          </p>
          <p className="text-center mb-4">
            The buzz around Bangalore's real estate market is all about secure, upscale living, with gated communities stealing the spotlight. Anticipate a surge of advancements in 2024 that combine opulence and ease with a focus on maintaining safety at the forefront. Picture this: guards at every gate, round-the-clock CCTV surveillance, and a secure environment where only the invited can enter. It's the epitome of safe living!
          </p>
          <p className="text-center mb-4">
            However, it doesn't end there. In these secluded neighbourhoods, abundant green spaces and top-notch amenities combine urban living with peaceful refuge. These residential havens capture the true essence of urban living, offering tranquillity and unmatched protection. Imagine a Bangalore home that elevates your lifestyle, where sophistication and safety converge, making every moment extraordinary!
          </p>
       
        </div>
  
        <div className="container mt-4">
          <div className="row">
            {cardsData.map((card) => (
              <div key={card.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={card.image} className="card-img-top" alt={card.title} />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text text-truncate" style={{ maxHeight: "3rem" }}>{card.description}</p>
                    <p className="card-text"><strong>Price:</strong> {card.price}</p>
                    <p className="card-text"><strong>Rating:</strong> {card.rating} ⭐</p>
                    <p className="card-text"><strong>Category:</strong> {card.category}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-primary" onClick={() => openModal(card)}>View More</button>
                      <button className="btn btn-secondary" onClick={() => window.open(card.url, "_blank")}>Visit Site</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={{
            content: {
              maxWidth: '80vw',
              maxHeight: '60vh',
              margin: 'auto',
              padding: '20px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }
          }}
        >
          <button onClick={closeModal} className="close" style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.5rem', background: 'transparent', border: 'none' }}>
            &times;
          </button>
          {selectedCard && (
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img src={selectedCard.image} alt={selectedCard.title} className="img-fluid" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                </div>
                <div className="col-md-6">
                  <h2>{selectedCard.title}</h2>
                  <p>{selectedCard.description}</p>
                  <p><strong>Price:</strong> {selectedCard.price}</p>
                  <p><strong>Rating:</strong> {selectedCard.rating} ⭐</p>
                  <p><strong>Category:</strong> {selectedCard.category}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success mr-2" onClick={() => alert("Chat Now button clicked!")}>Chat Now</button>
                    <button className="btn btn-info mr-2" onClick={() => alert("Call Now button clicked!")}>Call Now</button>
                    <button className="btn btn-warning" onClick={() => alert("Schedule Site Visit button clicked!")}>Schedule Site Visit</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ReactModal>
  
        <style jsx>{`
          .main-image-container {
            position: relative;
            width: 100%;
            height: 500px;
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
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
          }
          .text-content p {
            margin-bottom: 1rem;
          }
          .card-img-top {
            height: 200px;
            object-fit: cover;
          }
          .btn-secondary {
            background-color: #6c757d;
            border-color: #6c757d;
          }
          .btn-primary {
            margin-right: 10px;
          }
          .close {
            cursor: pointer;
            font-size: 2rem;
            color: #000;
          }
        `}</style>
      </div>
    );
  };
  
  export default Home;
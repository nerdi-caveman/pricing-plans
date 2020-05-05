import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { subscribeUser } from "./utils";

const ConfirmModal: React.FC<any> = ({ plan, closeModal }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    subscribeUser({ name, plan })
      .then((res: any) => {
        const json = res.json();
        setLoading(false);
        if (json.success) {
          alert("Success!!");
          closeModal();
        }
      })
      .catch((err: any) => {
        console.warn(e);
        setLoading(false);
      });
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="container">
          <button onClick={closeModal}>close</button>
          <h2>Confirm subscription</h2>
          <form>
            <div className="form-control">
              <label>{plan.name}</label>
              <p>{plan.price > 0 ? plan.price : "Free"}</p>
              <button>Change</button>
            </div>
            <div className="form-control">
              <label>Fullname</label>
              <input
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e: any) => setCardNumber(e.target.value)}
              />
            </div>
            <button type="button" onClick={submit}>
              {loading ? "Please wait" : "Start Membership"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const App: React.FC<any> = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const plans = [
    {
      name: "Bronze version",
      className: "bronze",
      price: 0.0,
      description: "14 days",
      more: [
        "24/7 Hours Support",
        "3 Monthly Campaigns",
        "10 Monthly Responses",
      ],
    },
    {
      name: "Silver version",
      className: "silver",
      price: 11.0,
      description: "14 days",
      more: [
        "24/7 Hours Support",
        "3 Monthly Campaigns",
        "10 Monthly Responses",
      ],
    },
    {
      name: "Gold version",
      className: "gold",
      price: 15.0,
      description: "1 month",
      more: [
        "24/7 Hours Support",
        "3 Monthly Campaigns",
        "10 Monthly Responses",
      ],
    },
  ];

  return (
    <main className="App">
      <div className="title">
        <h1>Pricing and plans</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          doloribus ipsam dignissimos debitis non neque, quo eaque id illum
          quibusdam deserunt explicabo maiores soluta, quia fuga exercitationem
          ipsum dicta ab?
        </p>
      </div>
      <section className="grid grid-three">
        {plans.map((item: any, index: number) => (
          <div key={index} className={`card ${item.className}`}>
            <h2>{item.name}</h2>
            <p>{item.price > 0 ? "$" + item.price + ".00" : "Free"}</p>
            <p className="sub-label">14 days</p>

            <ul>
              {item.more.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <button
              onClick={() => {
                setSelectedPlan({ name: item.name, price: item.price });
                setShowModal(true);
              }}
            >
              Choose plan
            </button>
          </div>
        ))}
      </section>
      {showModal && (
        <ConfirmModal
          plan={selectedPlan}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </main>
  );
};

export default App;

import React, { useState } from "react";

const Slug = (receivedTask) => {
    const [task, setTask] = useState(receivedTask.receivedTask.result);
  console.log("Objet Tâche reçu: ", receivedTask.receivedTask);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card">
          <div className="card-header">Tâche</div>
          <div className="card-body">
            <h5 className="card-title">Détail de la tâche</h5>
            <p className="card-text">
              {task && task.comment_director}
            </p>
            <p className="card-text">
              Durée assignée: {task && task.duration}h
            </p>
            <p className="card-text">
              Etat: {task && task.status == "Under Process"? 'En cours de Traitement': "Tâche accomplie"}
            </p>
            <a href="#" className="btn btn-info">
              Modifier la tâche
            </a>
          </div>
        </div>
      </div>

      <div className="row">
      {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let data = { slug: context.query.slug };
  try {
    // Fetch API of the Destination Data:
    let theTask = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Tasks/getTask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    let response = await theTask.json();

    return {
      props: { receivedTask: JSON.parse(JSON.stringify(response)) },
    };
  } catch (error) {
    console.log("Sorry error occured!");
    return;
  }
}

export default Slug;

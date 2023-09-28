import React from "react";

import { StoreState, AppDispatch } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addContact, editContact, ContactT } from "../Redux/contactSlice";

const Contact: React.FC = () => {
  const [isinputOpen, setisinputOpen] = React.useState<boolean>(false);

  const { contacts } = useSelector((store: StoreState) => store.contact);
  return (
    <>
      <main className="w-full flex flex-col items-center gap-4">
        <p className="p-3 text-3xl font-medium bg-slate-400 w-full text-center">
          Contact
        </p>
        {contacts.length ? (
          <section>
            <main className="flex gap-1 flex-wrap">
              {contacts.map((contact: ContactT) => (
                <ShowContact key={contact.id} {...contact} />
              ))}
              <div className="border rounded-md p-2">
                <button className="p-1 bg-green text-slate-100 text-center">
                  Add Contact
                </button>
              </div>
            </main>
          </section>
        ) : (
          <section className="">
            {isinputOpen ? (
              <InputForm />
            ) : (
              <button
                className="p-3 bg-grey color:white hover:bg-slate-300"
                onClick={() => setisinputOpen((value: boolean) => !value)}
              >
                Create Contact
              </button>
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default Contact;

const InputForm = () => {
  const [Name, setName] = React.useState<string | undefined>();
  const [Number, setNumber] = React.useState<number | undefined>();
  const dispatch = useDispatch();

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    const newContact: ContactT = {
      id: Math.random(),
      name: Name,
      contact: Number,
    };
    dispatch(addContact(newContact));
  };
  return (
    <div className="w-auto p-2 rounded-md border h-auto">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="p-1">Name</label>
        <input
          className="border p-1 rounded-md"
          value={Name}
          placeholder="Your Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <label className="p-1">Number</label>
        <input
          className="border p-1 rounded-md"
          placeholder="Number"
          value={Number}
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNumber(parseInt(e.target.value));
          }}
        />
        <button type="submit" className="p-1 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

const ShowContact = (props: ContactT) => {


    const [editedName, seteditedName] =React.useState<string |undefined>();
    const [editedContact,seteditedContact] =React.useState<number>();
    const dispatch = useDispatch();
  console.log(props.contact);
  console.log(props.name);
  const [isEdit, setisEdit] = React.useState<boolean>(false);
  const handleEdit = () => {
    setisEdit((value: boolean) => !value);
  };
  const handleEditSubmit=(e:React.FormEvent)=>{
e.preventDefault();
const editedDetails={
  id:props.id,
  name:editedName,
  contact:editedContact
}
dispatch(editContact(editedDetails))


  }

  return (
    <section className="flex flex-col gap-2 p-2 border rounded-md">
        {isEdit?<form onSubmit={(e)=>handleEditSubmit(e)}>
<input placeholder="Name" value={props.name} onChange={(e)=>{seteditedName(e.target.value)}}  />
<input placeholder="Number" value={props.contact} onChange={(e)=>{seteditedContact(parseInt(e.target.value))}} />

</form>
        
        
        
        
        :<>
        <div className="flex gap-1">Name: {props.name}</div>
        <div className="flex gap-1">Number: {props.contact}</div>
        <div className=" flex gap-2 justify-around">
          <button
            className="p-1 bg-slate-800 rounded-md text-slate-100 px-3 hover:scale-90 transition-all"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button className="p-1 bg-slate-800 rounded-md text-slate-100 px-3 hover:scale-90 transition-all">
            Delete
          </button>
        </div></>}
      
    </section>
  );
};

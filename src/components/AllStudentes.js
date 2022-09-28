import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';



const AllStudents = () => {
    const [myBooks, setMyBooks] = useState([]);
    console.log(myBooks);
    
    
    const url = `http://localhost:5000/students`
    // const url = `https://pure-basin-35880.herokuapp.com/books?email=${email}`
  
    console.log(url);

    useEffect(() => {
        fetch(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMyBooks(data)
            })

    }, [])

    // if(!myBooks.length < 0){
    //     return <Spinner />
    // }
   

    const handleDeleteItem = id => {
        const confirmation = window.confirm("Are you sure?");
        if (confirmation) {
            const url = `http://localhost:5000/students/${id}`
            console.log(url)
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const rest = myBooks.filter(book => book._id !== id);
                        setMyBooks(rest);
                    }
                })
        }
    }

   
    return (
        <div>
            {
                myBooks.map(book => <div className="md:w-[700px] md:mx-auto mx-10" key={book._id}>
                    <div className="flex justify-around items-center my-10 bg-gray-900 text-white  rounded-xl hover:bg-gray-700">
                        <div>
                            <img src={book.img} width="50" alt="" />
                        </div>
                        <div>
                            <h3>{book.name}</h3>
                        </div>
                        <div className="text-2xl">
                            <button onClick={() => handleDeleteItem(book._id)}><MdDelete color='red' /></button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AllStudents;
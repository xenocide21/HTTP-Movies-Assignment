import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const MovieForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const [placeholder, setPlaceholder] = useState({})

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        if (ev.target.name === 'stars') {
            value = value.split(",")
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => setPlaceholder(res.data) & setMovie(res.data))
            .catch(err => console.log(err.response));
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e, "this is paramter for handlesubmit")
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => console.log(res, "this is response for submit") & props.history.push("/"))
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder={placeholder.title}
                    value={movie.title}
                    required
                />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder={placeholder.metascore}
                    value={movie.metascore}
                    required
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder={placeholder.director}
                    value={movie.director}
                    required
                />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder={placeholder.stars}
                    value={movie.stars}
                    required
                />

                <button className="md-button form-button">Submit</button>
            </form>
            <button onClick={() => console.log(placeholder)}>Test</button>
        </div>
    );
};

export default MovieForm;
import React, { Component } from 'react'

class MemeGenerator extends Component {
    state = {
        headerText: '',
        bottomText: '',
        randomImg: 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?format=jpg&width=400&crop=3:2',
        api: []
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(memes)
                this.setState({
                    api: memes
                })
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.api.length)
        const randomMeme = this.state.api[randNum].url
        this.setState({
            randomImg: randomMeme
        })
    }

    render() {
        return (
            <div>
                <div className='f-container'>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type='text'
                            placeholder='headerText'
                            name='headerText'
                            value={this.state.headerText}
                            onChange={this.handleChange} />

                        <input
                            type='text'
                            placeholder='bottomText'
                            name='bottomText'
                            value={this.state.bottomText}
                            onChange={this.handleChange} />

                        <button> Generate Image</button>
                    </form>
                </div>
                <div className='meme'>
                    <h2 className='top'>{this.state.headerText}</h2>
                    <img src={this.state.randomImg} alt='loading pls wait' />
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;
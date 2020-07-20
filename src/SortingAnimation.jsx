import React from 'react';
import * as sortingAlgorithms from './sortingAlgorithms/sortingAlgorithms'
import './SortingAnimation.css';

// animation speed in ms
const ANIMATION_SPEED = 3;

export default class SortingAnimation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    // called when it loads
    componentDidMount() {
        this.resetArray();
    }

    // randomly generate new array
    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(10, 570));
        }
        this.setState({array: array});
    }

    // test sorting algorithm for 100 iterations
    testSort() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const len = randomIntFromInterval(1, 1000);
            for (let j = 0; j < len; j++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSorted = this.state.array.slice().sort((a, b) => a - b);
            const sorted = sortingAlgorithms.mergeSort(this.state.array);

            console.log(arraysEqual(javaScriptSorted, sorted));
        }
    }

    mergeSort() {
        const animations = sortingAlgorithms.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const colorChange = i % 3 !== 2;
            // change color
            if (colorChange) {
                const [idx1, idx2] = animations[i];
                const style1 = arrayBars[idx1].style;
                const style2 = arrayBars[idx2].style;
                const color = i % 3 === 0 ? 'cyan' : 'pink';
                setTimeout(() => {
                    style1.backgroundColor = color;
                    style2.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
            // change bar height
                const [idx, height] = animations[i];
                setTimeout(() => {
                    arrayBars[idx].style.height = `${height}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    render() {
        const {array} = this.state;

        return (
            <>
            <div className="array-container">
                {array.map((value, index) => (
                    <div className="array-bar" key={index} style={{height: `${value}px`}}>
                    </div>
                ))}
            </div>
            <div className="control-container">
                <button onClick={() => this.resetArray()}> New Array </button>
                <button onClick={() => this.mergeSort()}> Merge Sort </button>
                <button onClick={() => this.mergeSort()}> Quick Sort </button>
                <button onClick={() => this.mergeSort()}> Heap Sort </button>
                <button onClick={() => this.mergeSort()}> Bubble Sort </button>
                <button onClick={() => this.testSort()}> Test Sort </button>
            </div>
            </>
        )
    }
}

// random number generator inclusive
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// checks if two arrays are equal
function arraysEqual(first, second) {
    if (first.length !== second.length) return false;
    for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i]) return false;
    }
    return true;
}



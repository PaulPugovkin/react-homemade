import './App.css';
import { Container, List, Header } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import FeedbackOption from './components/FeedbackOption.jsx';

// const defaultProps = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
// };

export default class App extends Component {
    static defaultProps = {
        good: 0,
        neutral: 0,
        bad: 0,
    };

    state = {
        good: this.props.good,
        neutral: this.props.neutral,
        bad: this.props.bad,
    };

    componentDidMount() {}

    calculateTotal = () => {
        const { good, neutral, bad } = this.state;
        return good + neutral + bad;
    };

    positivePercentage = (value, total) => {
        let percentage = (value * 100) / total;

        if (isNaN(percentage)) {
            percentage = 0;
        }
        return Math.round(percentage);
    };
    handleClickFeedback = type => {
        switch (type) {
            case 'good':
                toast.success('Супер отличный отзыв! Браво!');
                break;
            case 'neutral':
                toast.info('Ну пойдет отзыв');
                break;
            case 'bad':
                toast.error('Вообще не ожидал конечно от тебя такого');
                break;
            default:
                break;
        }
        this.setState(prevState => {
            return { [type]: prevState[type] + 1 };
        });
    };

    render() {
        const { handleClickFeedback, calculateTotal, positivePercentage } =
            this;
        return (
            <div>
                <Container textAlign="center">
                    <Header as="h2" block>
                        Please leave feedback
                    </Header>
                    <FeedbackOption
                        options={['good', 'neutral', 'bad']}
                        onLeaveFeedback={handleClickFeedback}
                    />
                </Container>
                {calculateTotal() !== 0 && (
                    <Container>
                        <Header as="h2" block>
                            Statistics
                        </Header>
                        <List>
                            <List.Item>Good: {this.state.good}</List.Item>
                            <List.Item>Neutral: {this.state.neutral}</List.Item>
                            <List.Item>Bad: {this.state.bad}</List.Item>
                            <List.Item>Total: {calculateTotal()}</List.Item>
                            <List.Item>
                                Positive percentage:{' '}
                                {positivePercentage(
                                    this.state.good,
                                    calculateTotal(),
                                )}
                                %
                            </List.Item>
                        </List>
                    </Container>
                )}
                <ToastContainer />
            </div>
        );
    }
}

import React from 'react';
import events from '../data/events';
import EventItem from './EventItem';
import EventFilters from './EventFilters';
import EventAdd from './EventAdd';
import { connect } from 'react-redux';
import * as actions from '../actions/events'

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      newName: '',
      newNameValid: false,
      newPlace: '',
      newPlaceValid: false,
      newDate: '',
      newDateValid: false,
      newTime: '',
      newTimeValid: false
    };
  }

  componentDidMount() {
    this.setState({
      events
    });
  }

  onClearClicked(event) {
    event.preventDefault();

    this.props.clearEvents();
  }

  onDeleteClicked(id, event) {
    event.preventDefault();

    this.props.deleteEvent(id)
  }

  onFilterChange(event) {
    const value = event.currentTarget.value;

    this.setState({
      filter: value
    });
  };

  onEventFieldChange(field, event) {
    const value = event.currentTarget.value;
    this.setState({
      [field]: value,
      [field + 'Valid']: value.length > 0
    });
  }

  onEventAdd(event) {
    event.preventDefault();

    const {
      events,
      newName,
      newNameValid,
      newPlace,
      newPlaceValid,
      newDate,
      newDateValid,
      newTime,
      newTimeValid
    } = this.state;

    const maxId = Math.max(...events.map(item => item.id));

    events.push({
      id: maxId + 1,
      name: newName,
      place: newPlace,
      date: newDate,
      time: newTime
    });

    if (newNameValid && newPlaceValid && newDateValid && newTimeValid) {
      this.setState({
        events
      });
    }
  }

  render() {
    return (
      <div>
        <EventFilters onFilterChange={this.onFilterChange.bind(this)} />
        <ul>
          {this.props.events.map(item => {
            const date = new Date(item.date);

            if (date >= Date.now() && item.name.indexOf(this.state.filter) > -1) {
              return (
                <EventItem {...item} key={item.id} onDeleteClicked={this.onDeleteClicked.bind(this)} />
              );
            }

            return null;
          })}
        </ul>
        <button onClick={this.onClearClicked.bind(this)}>Wyczyść</button>
        <EventAdd name={this.state.newName}
                  place={this.state.newPlace}
                  date={this.state.newDate}
                  time={this.state.newTime}
                  nameValid={this.state.newNameValid}
                  placeValid={this.state.newPlaceValid}
                  dateValid={this.state.newDateValid}
                  timeValid={this.state.newTimeValid}
                  onFieldChange={this.onEventFieldChange.bind(this)}
                  onFormSubmit={this.onEventAdd.bind(this)}
        />
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearEvents: () => dispatch(actions.clearEvents()),
    deleteEvent: (id) => dispatch(actions.deleteEvent(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);

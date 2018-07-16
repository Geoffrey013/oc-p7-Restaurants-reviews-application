import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class StarsFilterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stars: [0, 5]
        };
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.handleFilterForm(this.state.stars);
    };

    onRangeChange = value => {
        this.setState({ stars: value });
    };

    render() {

        return (
            <div className="row">
                <div className="col-sm-12">
                    <form className="rating-form" onSubmit={this.onFormSubmit}>
                        <div>
                            <label htmlFor="range-input">Triez par notes</label>
                            <Range
                                id="range-input"
                                className="range-input"
                                min={0}
                                max={5}
                                defaultValue={this.state.stars}
                                onAfterChange={this.onRangeChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-custom">
                            Recherche
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

StarsFilterForm.propTypes = {
    handleFilterForm: PropTypes.func
};

export default StarsFilterForm;

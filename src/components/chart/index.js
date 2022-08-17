import React, {Component} from "react"
import PropTypes from "prop-types"
import "./index.scss"
class Chart  extends Component{
        state={
            largest:1
        }
        componentDidMount(){
            const max = Math.max(...this.props.data)
            this.setState({largest:max})
        }
        componentDidUpdate(prevProps){
            if(prevProps.data !== this.props.data){
                const max = Math.max(...this.props.data)
                this.setState({largest:max})
            }
        }
    render(){
    const { className, data} = this.props
    return (
        <table className={className} id="crib-chart">
            <tbody>
                <tr>
                    {
                        data.map((d, i)=>(
                            <td key={i}>
                                <div title={d}  style={{height:parseInt((d/this.state.largest)*145)}}></div>
                            </td>
                        ))
                    }
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Mon</td>
                    <td>Tue</td>
                    <td>Wed</td>
                    <td>Thu</td>
                    <td>Fri</td>
                    <td>Sat</td>
                    <td>Sun</td>
                </tr>
            </tfoot>
        </table>
    )
}
}
export default Chart
Chart.propTypes={
    data:PropTypes.array
}
Chart.defaultProps={
    data:[]
}

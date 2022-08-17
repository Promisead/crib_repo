import React, {Component} from "react"
import "./index.scss"
import PropTypes from "prop-types"
const Table = ({children, className, innerRef})=>{

    return (
        <table ref={innerRef} className={className} id="crib-table">
            {children}
        </table>
    )
}
export default Table

export const TableRow=({children, style, className})=>{
    return(
        <tr style={style} className={className} id="crib-table-row">
            {children}
        </tr>
    )
}
export const TableHead=({children})=>{
    return(
        <thead>
            {children}
        </thead>
    )
}
export const TableBody=({children})=>{
    return(
        <tbody>
            {children}
        </tbody>
    )
}


export const TableCell=({children, ...rest})=>{
    return(
        <td {...rest} className="crib-table-cell">
            {children}
        </td>
    )
}

export class TablePagination extends Component{
    state={
        totalPages:1,
        pages:[],
        current:1,
        len:2,
        offset:0
    }
    componentDidMount(){
        this.loadPagination()
    }
    componentDidUpdate(prevProps){
        if(prevProps.count !== this.props.count)
            this.loadPagination()
    }
    loadPagination=()=>{
        const  {count, rowsPerPage} = this.props
        const totalPages = Math.ceil(count/rowsPerPage)
        const pages = []
        for(let i =1; i<=totalPages; i++)
        pages.push(i)
        this.setState({totalPages, pages})
    }
    gotoPage=(e)=>{
        const current = parseInt(e.target.textContent)
        // const {len} = this.state
        // const offset = current/len
        if(this.props.onChangePage){
            this.props.onChangePage(current)
            this.setState({current:current})
        }
       
    }
    onNext=()=>{
        const {current, len, offset} = this.state
        let offsett = offset
        if((current+1)%len !== 0)
        offsett = offset+len
        if(this.props.onChangePage){
            this.props.onChangePage(current+1)
            this.setState({current:current+1, offset:offsett})
        }
    }
    onPrev=()=>{
        const {current,len, offset} = this.state
        let offsett = offset
        if((current-1)%len === 0)
        {
            offsett = offset-len
        }
        if(this.props.onChangePage){
            this.props.onChangePage(current-1)
            this.setState({current:current-1,offset:offsett})
        }
        
    }
    render(){
      const  {page, rowsPerPage} = this.props
      const {pages,current, offset,len} = this.state
      const nav = pages.slice(offset, offset+len)
    return(
        <div className="crib-table-pagination">
            <ul>
                {
                    pages.length>1?
                    <>
                        {
                            current > 1?
                            <li>
                                <button onClick={this.onPrev} aria-label="Prev">
                                    <span aria-hidden="true">
                                        
                                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.41 10.59L2.83 6L7.41 1.41L6 1.04907e-06L-1.04907e-06 6L6 12L7.41 10.59Z" fill="#1053FF"/>
                                        </svg>
                                         Page</span>
                                </button>
                            </li>
                            :
                            <li>
                                <button aria-label="Prev" className="disabled-tnav">
                                    <span aria-hidden="true">
                                        
                                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.41 10.59L2.83 6L7.41 1.41L6 1.04907e-06L-1.04907e-06 6L6 12L7.41 10.59Z" fill="#C4C4C4"/>
                                        </svg>
                                         Page</span>
                                </button>
                            </li>
                        }
                        {
                            nav.map(i=>{
                                return(
                                <li key={i}>
                                    <button onClick={this.gotoPage} className={i===current?'active':''}>{i}</button>
                                </li>
                                    )
                                })
                            
                        }
                        {
                            nav[nav.length-1] < this.state.totalPages?
                            <>
                                <li>
                                    <button aria-label="elipsis" className="disabled-tnav">
                                        <span aria-hidden="true">...</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={this.gotoPage} className={this.state.totalPages===current?'active':''}>{this.state.totalPages}</button>
                                </li>
                            </>
                            :
                            ''
                        }
                        {
                            current < pages.length?
                            <li>
                                <button onClick={this.onNext} aria-label="Next">
                                    <span aria-hidden="true">Page 
                                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.589999 1.41L5.17 6L0.59 10.59L2 12L8 6L2 5.24537e-07L0.589999 1.41Z" fill="#1053FF"/>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            :
                            <li>
                                <button aria-label="Next" className="disabled-tnav">
                                    <span aria-hidden="true">Page 
                                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.589999 1.41L5.17 6L0.59 10.59L2 12L8 6L2 5.24537e-07L0.589999 1.41Z" fill="#1053FF"/>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        }
                    </>
                    :''
                }
            </ul>
            <div className="crib-table-pagination-range">
                {
                    pages.length>1&&
                    <>
                    Range <p>{((page-1)*rowsPerPage)+1} - {((page-1)*rowsPerPage)+rowsPerPage}</p>
                    </>
                }
               
                </div>
        </div>
    )
}
}
export const TableContainer= ({children, className})=>{

    return (
        <div className={className}  id="crib-table-container">
            {children}
        </div>
    )
}

TablePagination.propTypes = {
    onChangePage:PropTypes.func
}
TablePagination.defaultProps={
    onChangePage:null
}
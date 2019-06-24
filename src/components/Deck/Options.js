import React from 'react'

export default function Options (props){
	return (
		<div>Options: &nbsp;&nbsp;&nbsp;
			<button onClick={props.fileSave} className="export-btn">Save</button>
			<input type="file" id="file" style={{display: 'none'}} onChange={props.readText} />
			<button><label htmlFor="file">Import</label></button> 
		</div>
	)
} 
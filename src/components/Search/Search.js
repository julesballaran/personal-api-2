import React from 'react'

export default function Search (props){

	return (
		<div className="search-card">
			<input onChange={e => props.handleSearch(e.target.value)} className="search-box" type="text" placeholder="Search Card" />
		</div>
	)
}
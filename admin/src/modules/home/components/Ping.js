import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const Ping = () => (
	<Query
		query={gql`
			query {
				ping
			}
		`}
	>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return data.ping;
		}}
	</Query>
);

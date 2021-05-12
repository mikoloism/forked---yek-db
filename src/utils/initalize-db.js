import { Types } from './types';
const [PRIMARY_KEY, AUTO_INCREMENT, ALLOW_NULL] = [true, true, true];
const [INTEGER, STRING, NUMERIC, BOOLEAN, TOGGLE, SWITCH, BIT] = [...Types];

const structure = function Structure({ path, name }) {
	return {
		database: { path, name },
		tables: [
			{
				table1: {
					schema: {
						id: { INTEGER, AUTO_INCREMENT, PRIMARY_KEY },
						field_name: { STRING, ALLOW_NULL },
					},
					rows: [],
				},
			},
			{
				'table-2': {
					schema: {
						id: { INTEGER, AUTO_INCREMENT, PRIMARY_KEY },
						fieldName: { STRING, ALLOW_NULL },
					},
					rows: [
						{ id: 1, fieldName: 'john' },
						{ id: 2, fieldName: 'robin' },
						{ id: 3, fieldName: 'darik' },
					],
				},
			},
		],
	};
};

export default structure;

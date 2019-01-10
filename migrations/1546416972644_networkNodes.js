exports.up = (pgm) => {
	pgm.createTable('networkNodes', {
		id: 'id',
		title: {
			type: 'varchar(100)',
			notNull: true,
		},
		IPAddress: {
			type: 'varchar(100)',
			notNull: true,
		},
		webPort: {
			type: 'int',
			notNull: true,
		},
		parentId: {
			type: "int",
			references: '"networkNodes"',
			onDelete: "cascade"
		},
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
		updatedAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});
};

exports.down = (pgm) => {
	pgm.dropTable('networkNodes');
};
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define(
    "Semester",
    {
      idSemester: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namaSemester: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idFase: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "semester",
      timestamps: false,
    }
  );

  return Semester;
};

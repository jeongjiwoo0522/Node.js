const Sequelize = require("sequelize");

// User 모델을 Sequelize.Model을 확장한 클래스로 선언한다. 
module.exports = class User extends Sequelize.Model {
  static init(sequelize) { //1. static init 메서드
    return super.init({ // 시퀄라이즈는 알아서 id를 기본 키로 연결한다.
      name: {
        type: Sequelize.STRING(20), // VARCHAR(20)
        allowNull: false,           // NOT NULL 
        unique: true,               // UNIQUE
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED, // INT UNSIGNED
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN, // TINYINT
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT, // TEXT
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE, // DATETIME
        allowNull: false,
        defaultValue: Sequelize.NOW, // DEFAULT now()
      },
    }, {
      sequelize,    //db.sequelize 객체를 넣어야한다. init 메서드의 매개변수와 연결되는 옵션
      timestamps: false, // timesamps 속성 값이 true면 creatAt과 updateAt 칼럼을 추가한다.
      underscored: false, // underscored 테이블 명과 컬럼 명을 캐멀케이스에서 스네이크케이스로 바꿈
      modelName: "User", // modelName 노드 프로젝트에서 사용하는 모델 이름
      tableName: 'users', // tableName 실제 데이터베이스의 테이블 이름
      paranoid: false, // paranoid true로 설정하면 deleteAt 컬럼이 생성
      charset: "utf8",
      collate: "utf8_general_ci", // 한글을 입력하기 위함 utfmb4, utfmb4_general_ci 이모티콘까지
    });
  }
  static associate(db) { // 2. static associate 메서드
    // 1: N 관계 hasmany / belongsTo
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
};
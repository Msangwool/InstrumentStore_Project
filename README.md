# InstrumentStore_Project


이 프로젝트는 악기 판매 프로그램입니다. node.js에서 제공하는 express 모듈을 사용하여 서버를 만들고 sequelize 모듈을 사용해 MySQL을 사용하였습니다.

사용자는 등록되어 있는 악기를 보고 장바구니에 등록할 수 있습니다. 같은 화면 속에서 권한에 따라 각각 다른 자격이 주어지는 것에 중점을 두었습니다.

권한에는 총 3가지가 존재합니다. 

<h3>1. 일반 권한</h3> 
    <blockquote>
    먼저, 일반 권한을 가진 사용자는 로그인, 회원 가입을 할 수 있고, 상품을 볼 수 있습니다.상품을 클릭하면 권한이 없으므로 로그인 페이지로 넘어가게 됩니다.
    </blockquote><br>
    
<h3>2. 사용자 권한 </h3>
    <blockquote>
    두 번째로 사용자 권한입니다. 사용자 권한은 일반 회원 가입을 통해 생성된 아이디로 로그 인하면 얻을 수 있습니다. 사용자 권한을 얻은 사용자는 내 정보, 장바구니를 볼 수 있습니다.
    <br><br>
    
- 내 정보 : 회원 가입에 입력한 내용을 볼 수 있고, 이 내용을 수정할 수 있고, 아예 회원을 삭제할 수 있습니다.
- 장바구니 : 사용자가 추가한 장바구니 내역을 볼 수 있습니다.
- 상품 클릭: 해당 상품에 대한 자세한 정보와 장바구니에 추가할 수 있습니다.
  </blockquote><br>

<h3>3. 관리자 권한</h3>
    <blockquote>
    세 번째로 관리자 권한입니다. 사용자 권한을 얻은 일반 유저의 아이디를 개발자가 DB에 직접 접근해서 지정하면 이 권한을 얻을 수 있습니다.
    관리자 권한을 얻은 관리자는 악기를 추가할 수 있고, 모든 악기 정보를 볼 수 있습니다.
    <br><br>
    
  - 악기추가 : 악기를 추가할 수 있습니다. (이름과 가격, 작성자가 모두 같으면 같은 제품으로 판단하여 추가하지 않고 기존 악기에 개수만 더해줌!
  - 모든악기보기 : 악기 테이블에 있는 모든 악기 정보를 볼 수 있습니다.
  - 상품 클릭 : 해당 상품에 대한 자세한 정보를 볼 수 있고, 악기 정보 수정을 할 수 있습니다. 해당 악기 삭제도 가능합니다.
  </blockquote>
  
## 세부사항
- router를 통해 users 와 manager 즉, 유저가 볼 수 있는 화면들을 users에서 관리하고, 관리자가 볼 수 있는 화면들을  managerKey 페이지에서 비밀번호 인증 후, managerKey/manager 에서 관리합니다.

- users에서의 api는 로그인, 회원가입, 사용자 개인 정보 확인, 패스워드 변경, 게시글 생성, 게시판 전체 보기, 아이디로 작성된 게시글 검색, 자신이 올린 게시글 수정, 게시글 삭제가 있으며, 회원가입을 완료한 사용자가 접근할 수 있는 권한을 갖는 페이지들 입니다.

- manager에서의 api는 사용자 정보 보기, 게시판 정보 보기, 사용자 출석 관리, 사용자 달란트 관리(사용자의 출석과 달란트는 manager에서만 접근할 수 있게 설계), 사용자 앨범 관리, 공지사항 추가, 유저 삭제가 있습니다. 이는 bcrypt 암호화 모듈을 통해 manager 권한을 획득한 관리자만 접근할 수 있는 페이지들입니다.

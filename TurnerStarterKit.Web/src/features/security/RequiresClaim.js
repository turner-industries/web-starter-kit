import { connect } from 'react-redux';

const RequiresClaim = ({ claim, user, render }) => {
  if(!user || user.claims.indexOf(claim) === -1){
    return null;
  }

  return render();
};

const mapStateToProps = (state) => {
  return {
    user: state.identity.user,
  };
};

export default connect(mapStateToProps)(RequiresClaim);

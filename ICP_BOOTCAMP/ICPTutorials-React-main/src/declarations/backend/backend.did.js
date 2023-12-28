export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Tutorial__1 = IDL.Record({
    'title' : IDL.Text,
    'html' : IDL.Text,
    'assets' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'tags' : IDL.Vec(IDL.Text),
  });
  const Publication = IDL.Record({
    'content' : Tutorial__1,
    'autor' : IDL.Nat,
    'date' : IDL.Int,
  });
  const User = IDL.Record({
    'sex' : IDL.Opt(IDL.Text),
    'country' : IDL.Opt(IDL.Text),
    'birthdate' : IDL.Opt(IDL.Nat),
    'admissionDate' : IDL.Int,
    'name' : IDL.Text,
    'avatar' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Tutorial = IDL.Record({
    'title' : IDL.Text,
    'html' : IDL.Text,
    'assets' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'tags' : IDL.Vec(IDL.Text),
  });
  const PublishResult = IDL.Variant({ 'ok' : Publication, 'err' : IDL.Text });
  const SignUpErrors = IDL.Variant({
    'InBlackList' : IDL.Null,
    'CallerAnnonymous' : IDL.Null,
    'IsAlreadyAMember' : IDL.Null,
  });
  const SignUpResult = IDL.Variant({ 'ok' : User, 'err' : SignUpErrors });
  const UserSettings = IDL.Record({
    'sex' : IDL.Opt(IDL.Text),
    'country' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'avatar' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const ICPTutorials = IDL.Service({
    'aprovePublication' : IDL.Func([IDL.Nat], [Result], []),
    'getAprovedPublication' : IDL.Func([], [IDL.Vec(Publication)], ['query']),
    'getIncomingPublication' : IDL.Func([], [IDL.Vec(Publication)], []),
    'getMiId' : IDL.Func([], [IDL.Opt(IDL.Nat)], []),
    'getMiUser' : IDL.Func([], [IDL.Opt(User)], []),
    'getPubFromUser' : IDL.Func([IDL.Nat], [IDL.Vec(Publication)], ['query']),
    'getUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'loadAvatar' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [],
      ),
    'publish' : IDL.Func([Tutorial], [PublishResult], []),
    'rejectPublication' : IDL.Func([IDL.Nat], [Result], []),
    'signUp' : IDL.Func([IDL.Text, IDL.Text], [SignUpResult], []),
    'userConfig' : IDL.Func([UserSettings], [], []),
  });
  return ICPTutorials;
};
export const init = ({ IDL }) => { return []; };

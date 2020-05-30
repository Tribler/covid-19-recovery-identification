import nox


@nox.session
def tests(session):
    session.install("pyipv8")
    session.install("asynctest")
    session.install("coverage")
    session.log("hi")
    session.run('coverage', 'run', '-m', 'unittest', 'discover')
    session.run('coverage', 'report', '-m')

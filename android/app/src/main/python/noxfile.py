import nox


@nox.session
def tests(session):
    session.install("pyipv8")
    session.install("asynctest")
    session.run('python', '-m', 'unittest', 'discover')

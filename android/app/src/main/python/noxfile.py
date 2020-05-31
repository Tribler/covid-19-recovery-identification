import nox


@nox.session
def tests(session):
    session.install("pyipv8")
    session.install("asynctest")
    session.install("coverage")
    session.run('coverage', 'run', '--source=.', '--omit=.nox/*, noxfile.py', '-m', 'unittest', 'discover')

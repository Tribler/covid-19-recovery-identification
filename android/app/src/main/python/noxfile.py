import nox


@nox.session
def tests(session):
    session.install("pyipv8")
    session.install("asynctest")
    session.install("coverage")
    session.run('coverage', 'run', '--branch', '--source=.', '--omit=*.nox/*,noxfile.py,test_*.py', '-m', 'unittest', 'discover')

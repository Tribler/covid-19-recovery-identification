import nox


@nox.session
def tests(session):
    session.install('-r', 'requirements.txt')
    session.install("asynctest")
    session.install("coverage")
    session.run('coverage', 'run', '--branch', '--source=.',
                '--omit=*.nox/*,noxfile.py,test_*.py', '-m', 'unittest',
                'discover')


@nox.session
def lint(session):
    session.install('flake8')
    session.run('flake8', '--extend-exclude=.nox', '.')


@nox.session
def bandit(session):
    session.install('bandit')
    session.run('bandit', '-x', '*.nox/*,noxfile.py', '-r', '.')

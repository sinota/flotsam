#!/usr/bin/env python
# -*- coding: utf-8 -*-


def update_index(destdir):
    '''destdir 内のHTMLファイルへのインデックスページを作成する
    '''
    from os import path
    import glob
    from jinja2 import Template

    if not path.exists(destdir):
        raise Exception('The directory not found: {}'.format(destdir))
    dstpath = path.join(destdir, 'index.html')
    tmpl = Template(open('templates/index_page.html').read())
    links = []
    for fpath in glob.glob(destdir.rstrip('/') + '/*.html'):
        fname = path.basename(fpath)
        if fname == 'index.html':
            continue
        links.append((path.splitext(fname)[0], fname))
    with open(dstpath, 'w') as f:
        f.write(tmpl.render(links=links))


if __name__ == "__main__":
    import sys
    cmd = sys.argv[1]
    args = sys.argv[2:]
    env = locals()
    env[cmd](*args)
